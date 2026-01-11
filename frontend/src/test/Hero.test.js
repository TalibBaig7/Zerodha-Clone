import React from "react";
import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";

import Hero from "../Landing_page/home/Hero";

describe("Hero Component", () => {
  test("render hero image", () => {
    render(<Hero />);
    const heroImage = screen.getByAltText("Hero Image");
    expect(heroImage).toBeInTheDocument();
    expect(heroImage).toHaveAttribute("src", "media/homeHero.png");
  });
  test("render signup button", () => {
    render(<Hero />);
    const signupButton = screen.getByRole("button", {
      name: "/Sign Up for Free/i",
    });
    expect(signupButton).toBeInTheDocument();
    expect(signupButton).toHaveClass("btn btn-primary");
  });
});
