"use client";
import { Model, Survey } from "survey-react-ui";
import "./survey-theme.css";
// import "./components/input"; // Import to register the custom input component

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
    {
      name: "Comments",
      title: "Additional comments:",
      type: "comment",
    },
  ],
};

export function SurveyComponent() {
  const survey = new Model(surveyJson);

  return <Survey model={survey} />;
}
