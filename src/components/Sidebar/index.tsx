import React, { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import SidebarNoteList from "@/components/SidebarNoteList";
import NoteListSkeleton from "@/components/NoteListSkeleton";
import EditButton from "@/components/EditButton";
import SidebarSearchField from "@/components/SidebarSearchField";
import type { Locale } from "@/config";
import { useTranslation } from "@/i18n";

export default async function Sidebar({ lng }: { lng: Locale }) {
  const { t } = await useTranslation(lng);
  return (
    <>
      <section className="col sidebar">
        <Link
          href={"https://github.com/reactjs/server-components-demo/tree/main"}
          className="link--unstyled"
        >
          <section className="sidebar-header">
            <Image
              className="logo"
              src="/logo.svg"
              width="22"
              height="20"
              alt=""
              role="presentation"
            />
            <strong>React Notes</strong>
          </section>
        </Link>
        <section className="sidebar-menu" role="menubar">
          <SidebarSearchField lng={lng} />
          <EditButton noteId="">{t("new")}</EditButton>
        </section>
        <nav>
          <Suspense fallback={<NoteListSkeleton />}>
            {/*<SidebarNoteList notes={notes} />*/}
            <SidebarNoteList />
          </Suspense>
        </nav>
      </section>
    </>
  );
}
export const getServerSideProps = async (context) => {
  console.log("PX-params", context.params);

  // 你可以在此处添加其他数据获取逻辑，比如从数据库或其他API获取数据

  return {
    props: {},
  };
};
