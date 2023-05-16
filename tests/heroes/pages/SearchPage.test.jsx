const { render, screen, fireEvent } = require("@testing-library/react");
const { MemoryRouter, useNavigate } = require("react-router-dom");
const { SearchPage } = require("../../../src/heroes/pages/SearchPage");

const mockedUserNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUserNavigate,
}));

describe("Pruebas en <SearchPage />", () => {
  beforeEach(() => jest.clearAllMocks());

  test("debe de mostrarse correctamente con valores por defecto", () => {
    const { container } = render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    );
    expect(container).toMatchSnapshot();
  });

  test("debe de mostrar a batman y el input con ell valor del queryString", () => {
    render(
      <MemoryRouter initialEntries={["/search?q=batman"]}>
        <SearchPage />
      </MemoryRouter>
    );
    const input = screen.getByRole("textbox");
    const image = screen.getByRole("img");
    const alert = screen.getByLabelText("alert-danger");
    expect(input.value).toBe("batman");
    expect(image.src).toContain("dc-batman");
    expect(alert.style.display).toBe("none");
  });

  test("debe de mostrar un error si no se encuentra el heroe", () => {
    render(
      <MemoryRouter initialEntries={["/search?q=batman123"]}>
        <SearchPage />
      </MemoryRouter>
    );
    const alert = screen.getByLabelText("alert-no-hero");
    expect(alert.style.display).toBe("");
  });

  test("debe de llamar el navigate a la pantalla nueva", () => {
    render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    );
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "Superman" } });
    const form = screen.getByTestId("form");
    fireEvent.submit(form);
    expect(mockedUserNavigate).toHaveBeenCalledWith("?q=Superman");
  });
});
