"use client"

import { useState } from "react"
import { ProjectNav } from "@/components/project-nav"
import ProjectDetail from "./project"

export default function ProjectPage() {
  const [isActive, setIsActive] = useState(true)

  return (
    <>
      <ProjectNav
        projectName="Customer Service Bot"
        projectId="1"
        status="active"
        isActive={isActive}
        onToggleStatus={() => setIsActive(!isActive)}
      />
      <div className="pt-6">
        <ProjectDetail params={{ projectName: "1" }} />
      </div>
    </>
  )
}
