/* eslint-disable no-undef */
import { render, waitFor } from "@testing-library/react";
import FeedbackPanel from "../components/FeedbackPanel";
import { mockMessage } from "./mockMessage";

describe(FeedbackPanel, () => {
  it("should display a header stating 'Feedback Board'", () => {
    const { getByTestId } = render(
      <FeedbackPanel
        feedback={["feedback 1", "feedback 2"]}
        loading={false}
        messages={[mockMessage.message]}
        conversation={1}
        conversationList={[1]}
      />
    );
    const feedBackH1 = getByTestId("feedBackH1");
    expect(feedBackH1).toBeInTheDocument();
  });

  it("should display a Robot", () => {
    const { getByTestId } = render(
      <FeedbackPanel
        feedback={["feedback 1", "feedback 2"]}
        loading={false}
        messages={[mockMessage.message]}
        conversation={1}
        conversationList={[1]}
      />
    );
    expect(getByTestId("robotTutor")).toBeInTheDocument();
  });

  it("should display the loading Robot when loading", () => {
    const { getByTestId } = render(
      <FeedbackPanel
        feedback={["feedback 1", "feedback 2"]}
        loading={true}
        messages={[mockMessage.message]}
        conversation={1}
        conversationList={[1]}
      />
    );
    const robotTutor = getByTestId("loadingRobotTutor");
    expect(robotTutor).toBeInTheDocument();
  });

  it("should diplsay feedback when it is present", async () => {
    const { getByTestId } = render(
      <FeedbackPanel
        feedback={["feedback 1", "feedback 2"]}
        loading={false}
        messages={[mockMessage.message]}
        conversation={1}
        conversationList={[1]}
      />
    );
    await waitFor(() => {
      expect(getByTestId("testfeedBackUL")).toBeInTheDocument();
    });

  });

  it("should display feedback when there are messages or feedback", () => {
    const { getAllByTestId } = render(
      <FeedbackPanel
      feedback={["feedback 1", "feedback 2"]}
      loading={false}
      messages={[mockMessage.message]}
      conversation={1}
      conversationList={[1]}
      />
    );
    const emptyLI = getAllByTestId("feedbackLI");
    expect(emptyLI[0]).toBeInTheDocument();
  });

  it("should NOT display feedback when there is no messages or feedback", () => {
    const { getByTestId } = render(
      <FeedbackPanel
        feedback={[""]}
        loading={false}
        messages={[]}
        conversation={2}
        conversationList={[1, 2]}
      />
    );
    const emptyLI = getByTestId("emptyLI");
    expect(emptyLI).toBeInTheDocument();
  });
});
