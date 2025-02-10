export interface Category {
    id: number;
    name: string;
}

export interface Level {
    id: number;
    category_id: number;
    name: string;
    completed?: boolean;
}

export interface Answer {
    id: number;
    question_id: number;
    answer_text: string;
    is_correct: boolean;
}

export interface Question {
    id: number;
    level_id: number;
    question_text: string;
    answers: Answer[];
}