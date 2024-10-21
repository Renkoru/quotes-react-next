"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import {
  Autocomplete,
  Button,
  Stack,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const languageOptions = ["en", "ru"];

const schema = z.object({
  content: z.string().min(1, "Content is required"),
  lang: z.string().min(1, "Language is required"),
  author: z.string(),
});

function removeEmptyFields(data: Record<string, undefined>) {
  const result = { ...data };
  Object.keys(result).forEach((key) => {
    if (result[key] === "" || result[key] == null) {
      delete result[key];
    }
  });

  return result;
}

export default function CreateQuote({ userId }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      lang: languageOptions[0],
    },
  });
  const [authors, setAuthors] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // TODO: check if it is called two times?
    const authorsRes = fetch("/api/v1/authors", {})
      .then((response) => response.json())
      .then((data) => setAuthors(data.data));
  }, []);

  async function onSubmit(formData: FieldValues) {
    console.log("TCL: [line 18][CreateQuote.tsx] formData: ", formData);
    console.log("CreateQuote user id", userId);

    const dataToCreate = {
      ...removeEmptyFields(formData),
      addedBy: {
        connect: [userId],
      },
    };

    if (formData.author.length !== 0) {
      let authorId = authors.find(({ name }) => name === formData.author);

      if (!authorId) {
        const response = await fetch("/api/v1/authors", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: {
              name: formData.author,
            },
          }),
        })
          .then((response) => response.json())
          .then((data) => data.data);

        console.log("CreateQuote", response);
        authorId = response.documentId;
      }

      dataToCreate.author = { connect: [authorId] };
    }

    // TODO: extract this into service
    const response = await fetch("/api/v1/quotes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: dataToCreate,
      }),
    });

    reset();
    router.refresh();
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} id="create-quote-form">
        <Stack spacing={2}>
          <TextField
            id="content"
            aria-label="Quote content"
            minRows={3}
            label="Quote text"
            multiline
            error={!!errors.content}
            helperText={
              errors.content?.message && String(errors.content?.message)
            }
            {...register("content")}
          />

          <Autocomplete
            freeSolo
            id="lang"
            options={languageOptions}
            inputValue={languageOptions[0]}
            renderInput={(params) => (
              <TextField
                aria-label="Quote language"
                label="Quote language"
                error={!!errors.lang}
                helperText={
                  errors.lang?.message && String(errors.lang?.message)
                }
                {...params}
                {...register("lang")}
              />
            )}
          />

          <Autocomplete
            freeSolo
            autoSelect
            id="author"
            options={authors.map(({ name }) => name)}
            renderInput={(params) => (
              <TextField
                aria-label="Quote author"
                label="Author"
                error={!!errors.author}
                helperText={
                  errors.author?.message && String(errors.author?.message)
                }
                {...params}
                {...register("author")}
              />
            )}
          />

          <Button type="submit" form="create-quote-form" variant="outlined">
            Create
          </Button>
        </Stack>
      </form>
    </div>
  );
}
