import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "../../Home";

describe("home", () => {
  it("should find a search field at home", () => {
    render(<Home />);

    expect(
      screen.getByPlaceholderText("Buscar Ferramentas")
    ).toBeInTheDocument();
  });

  it("should render card tools", () => {
    render(<Home />);

    expect(screen.getByTestId("card-element")).toBeInTheDocument();
  });

  it("should test card click to open modal", () => {
    render(<Home />);

    const openModalButton = screen.getByTestId("card-element");
    fireEvent.click(openModalButton);
  });
});
