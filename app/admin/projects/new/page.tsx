import ProjectForm from '../ProjectForm'

export default function NewProjectPage() {
  return (
    <div>
      <div className="ad-page-head">
        <div>
          <h1>New Project</h1>
          <p>Create a new case study</p>
        </div>
      </div>
      <ProjectForm isNew />
    </div>
  )
}
