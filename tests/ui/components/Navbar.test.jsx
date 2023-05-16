const { render, screen, fireEvent } = require("@testing-library/react");
const { AuthContext } = require("../../../src/auth/context/AuthContext");
const { MemoryRouter } = require("react-router-dom");
const { Navbar } = require("../../../src/ui/components/Navbar");

const mockedUserNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUserNavigate,
}));

describe("Pruebas en <Navbar />", () => {
  const contextValue = {
    logged: true,
    user: {
      name: "Juanito Perez",
    },
    logout: jest.fn(),
  };

  beforeEach(() => jest.clearAllMocks());

  test("debe de mostrar el nombre del usuario", () => {
    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByText("Juanito Perez")).toBeTruthy();
  });

  test("debe de llamar el logout y navigate cuando se hace click en logout", () => {
    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    const logoutBtn = screen.getByRole("button");
    fireEvent.click(logoutBtn);

    expect(contextValue.logout).toHaveBeenCalled();
    expect(mockedUserNavigate).toHaveBeenCalledWith("/login", {
      replace: true,
    });
  });
});
