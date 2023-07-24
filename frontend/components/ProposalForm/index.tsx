'use client'
import React from "react";
import {Button, TextareaField, TextInputField} from "evergreen-ui";
import LogoUploader from "@/components/LogoUploader";
import {supabase} from "@/app/supabaseClient";
import {useAccount} from "wagmi";


export default function ProposalForm() {
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const values = Object.fromEntries(new FormData(e.target as HTMLFormElement));
    await supabase.from("proposals").insert({
      name: values.name,
      description: values.description,
      link: values.link,
    })
  };
  return(<form onSubmit={onSubmit}>
    <TextInputField
      label="Name"
      name="name"
      placeholder="Text input placeholder..."
    />
    <TextareaField
      label="Description"
      name="description" placeholder="Text input placeholder..." />
    <TextInputField
      label="Link"
      name="link" placeholder="https://meduza.io" />
    <LogoUploader />
    <Button appearance="primary" type="submit">
      Submit
    </Button>
  </form>)
}