import Head from "next/head";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";

import { api } from "~/utils/api";

export default function Home() {
  //   const hello = api.example.hello.useQuery({ text: "Railway" });
  //   const clerkuser = api.example.me.useQuery();
  const rule = api.rules.getAll.useQuery({ guild_id: "846599213440696360" });
  const servers = api.discord.getServersWhereUserIsAdmin.useQuery();
  const { mutate } = api.discord.hello.useMutation();

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <div className="text-2xl text-white">
            <div className="flex flex-col">
              {rule.data
                ? rule.data.rules.flatMap((rule) => (
                    <span>
                      {rule.rule_name}: {rule.rule_content}
                    </span>
                  ))
                : "Loading..."}
              {servers.data
                ? servers.data.flatMap((guild) => (
                    <span>
                      {guild.name}: {guild.id}
                    </span>
                  ))
                : "Loading..."}
            </div>
            <br />
            <input
              type="button"
              value="Send a message"
              onClick={() => mutate({ text: "hello from react frontend" })}
            />
          </div>
          <AddRuleForm />
        </div>
      </main>
    </>
  );
}

function AddRuleForm() {
  const { mutate } = api.rules.addNewRegexRule.useMutation();
  type Inputs = {
    guild_id: string;
    regex: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => mutate({...data});
  return (
    <div className="flex flex-col bg-sky-200">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <div className="flex flex-col">
          <span>Guild Id:</span>
          <input
            defaultValue={"846599213440696360"}
            {...register("guild_id", { required: true })}
            className="mb-4"
          />
          {errors.guild_id && <span>This field is required</span>}
        </div>
        <div className="flex flex-col">
          <span>Regex:</span>
          <input {...register("regex", { required: true })} className="mb-4" />
          {errors.regex && <span>This field is required</span>}
        </div>
        <input type="submit" className="bg-white" />
      </form>
    </div>
  );
}
