import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Episode from "./../Episode";

const testEpisode = {
  id: 553946,
  image:
    "https://static.tvmaze.com/uploads/images/medium_landscape/342/855786.jpg",
  name: "Chapter One: The Vanishing of Will Byers",
  season: 1,
  number: 1,
  summary:
    "A young boy mysteriously disappears, and his panicked mother demands that the police find him.",
  runtime: 49,
};

const testEpisodeNullImage = {
  id: 553946,
  image: null,
  name: "Chapter One: The Vanishing of Will Byers",
  season: 1,
  number: 1,
  summary:
    "A young boy mysteriously disappears, and his panicked mother demands that the police find him.",
  runtime: 49,
};

test("renders without error", () => {
  render(<Episode episode={testEpisode} />);
});

test("renders the summary test passed as prop", () => {
  render(<Episode episode={testEpisode} />);

  const summary = screen.queryByText(
    /a young boy mysteriously disappears, and his panicked mother demands that the police find him./i
  );

  expect(summary).toBeInTheDocument();
  expect(summary).toHaveTextContent(
    "A young boy mysteriously disappears, and his panicked mother demands that the police find him."
  );
  expect(summary).toBeTruthy();
});

test("renders default image when image is not defined", () => {
  render(<Episode episode={testEpisodeNullImage} />);

  const image = screen.getByAltText(
    "https://i.ibb.co/2FsfXqM/stranger-things.png"
  );

  expect(image).toBeInTheDocument();
});
