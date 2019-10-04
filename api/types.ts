export interface SubjectData {
  title: string;
  code: string;
  developmentPurposes: string[];
  purposes: string[];
  courseInfo: {
    [key: string]: string;
  };
  description: string;
  typeOfSchooling: string;
  category: string;
  applicableFrom: string;
  courses: string[];
}

type SubjectArray = Array<{
  code: string;
  minPoints: number;
  courses: string[];
}>;

export interface ProgramData {
  title: string;
  code: string;
  url: string;
  typeOfSchooling: string;
  typeOfProgram: string;
  applicableFrom: string;
  info: {
    degreeObjective: {
      html: string;
    };
    orientation: {
      title: string;
      html: string;
    };
    educationObjective: {
      title: string;
      html: string;
    };
  };
  education: {
    mandatory: {
      courses: string[];
      subjects: SubjectArray;
    };
    program: {
      courses: string[];
      subjects: SubjectArray;
    };
    specialization: {
      courses: string[];
      subjects: SubjectArray;
    };
    orientations: Array<{
      name: string;
      code: string;
      courses: string[];
      points: number;
      subjects: SubjectArray;
    }>;
    profiles: Array<{
      name: string;
      code: string;
      points: number;
      courses: string[];
      subjects: SubjectArray;
    }>;
    professionalDegrees: Array<{
      name: string;
      code: string;
      courses: string[];
      subjects: SubjectArray;
    }>;
  };
}

type Criteria = Array<Array<string>>;
type CentralContents = Array<[null | string, Array<string>]>;
export interface CourseData {
  subject: string;
  title: string;
  code: string;
  points: number;
  criteria: {
    A: Criteria;
    C: Criteria;
    E: Criteria;
  };
  centralContent: CentralContents;
  UNSAFE_description: string;
  applicableSubjectPurposes: number[];
}
