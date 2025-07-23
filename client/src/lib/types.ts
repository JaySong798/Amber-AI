export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  structured_response?: StructuredResponse;
}

export interface StructuredResponse {
  introduction: string;
  artistic_features: ArtisticFeature[];
  historical_significance: string;
  cultural_context: string;
  cultural_stories: CulturalStory[];
  follow_up_questions: FollowUpQuestion[];
}

export interface ArtisticFeature {
  title: string;
  description: string;
}

export interface CulturalStory {
  title: string;
  story: string;
}

export interface FollowUpQuestion {
  question: string;
  description: string;
}

export interface QuickQuestion {
  question: string;
  description: string;
}

export interface Topic {
  id: string;
  name: string;
  question: string;
}
