"use client";
import { Model, Survey } from "survey-react-ui";
import "survey-core/survey-core.css";
const surveyJson = {
  elements: [
    {
      name: "FirstName",
      title: "Enter your first name:",
      type: "text",
    },
    {
      name: "LastName",
      title: "Enter your last name:",
      type: "text",
    },
  ],
};

export function SurveyComponent() {
  const survey = new Model(surveyJson);

  return <Survey model={survey} />;
}
