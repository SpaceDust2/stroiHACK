// types/employee.ts

export interface Employee {
    id: number
    fullName: string
    position: string
    loadPercentage: number
    assignedWorks: number
    completedWorks: number
    nextDeadline: string // Формат даты нужно будет подстроить под ваши нужды
    openRequests: number
    workStatus: string
    // Другие поля согласно требованиям
  }
  