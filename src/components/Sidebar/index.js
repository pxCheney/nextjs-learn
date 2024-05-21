import React, { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import SidebarNoteList from "@/components/SidebarNoteList";
import NoteListSkeleton from "@/components/NoteListSkeleton";
import EditButton from "@/components/EditButton";
import SidebarSearchField from "@/components/SidebarSearchField";

export default async function Sidebar() {
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
          <SidebarSearchField />
          <EditButton noteId={null}>New</EditButton>
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
