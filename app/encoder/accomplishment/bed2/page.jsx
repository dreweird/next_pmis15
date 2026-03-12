"use client";

import React, { useEffect, useState } from "react";
import Bed2Component from "@/app/components/Bed2Table";
import { useSession } from "next-auth/react";

export default function Bed2Page() {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const [editableMonth, setEditableMonth] = useState([]);

  const id = session?.user?.id;
  const selectedValue = id?.toString() || "";

  useEffect(() => {
    fetch("/api/mfo/locked")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.result);
        const editable = data.result.filter((x) => x.locked === 0);
        setEditableMonth(editable);
      });
  }, []);

  return (
    <div>
     <div className="mb-3">
      <span className="font-semibold mr-2">Editable Month:</span>

      {editableMonth.length > 0 ? (
        editableMonth.map((x) => (
          <span
            key={x.month}
            className="bg-green-100 text-green-700 px-2 py-1 rounded-md text-sm mr-2"
          >
            {x.month}
          </span>
        ))
      ) : (
        <span className="text-red-500">No editable month</span>
      )}
    </div>
      <Bed2Component locked={posts} selectedValue={selectedValue} />
    </div>
  );
}