export interface User {
  id: number
  username: string
  email: string
  first_name: string
  last_name: string
}

export interface Technology {
  id: number
  name: string
}

export interface Company {
  id: number
  name: string
  is_remote: boolean
  start_date: string
  end_date: string | null
}

export interface Position {
  id: number
  name: string
  company: Company
  start_date: string
  end_date: string | null
}

export interface Achievement {
  id: number
  title: string
  description: string
  company?: Company | null
}

export interface Screenshot {
  id: number
  title: string
  description: string
  image: string
  order?: number | null
  project_id: number
}

export interface Project {
  id: number
  name: string
  description: string
  tech_stack: Technology[]
  company?: Company | null
  screenshots: Screenshot[]
}
