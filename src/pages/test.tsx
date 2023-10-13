import Head from "next/head";
import Link from "next/link";


import { api } from "~/utils/api";
import Layout from "~/components/Layout";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  //   const hello = api.example.hello.useQuery({ text: "Railway" });
  //   const clerkuser = api.example.me.useQuery();
  // const rule = api.rules.getAllCustom.useQuery({ guild_id: "846599213440696360" });

  return (
    <Layout>
      <div className="p-8 pt-6 space-y-4">
        <div className="">
        <h2 className="text-3xl font-bold">Dashboard</h2>
        </div>
        
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">
              Overview
            </TabsTrigger>
            <TabsTrigger value="moderation">
              Moderation
            </TabsTrigger>
          </TabsList>

        </Tabs>
      </div>
    </Layout>
  );
}
