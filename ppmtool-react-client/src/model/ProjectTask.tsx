export default interface ProjectTask {
  summary: string;
  status: string;
  acceptanceCriteria: string;
  priority: number;
  dueDate: string;
  projectIdentifier: string;
  projectSequence?: string;
}
