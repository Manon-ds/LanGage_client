import { ReactComponent as LogoL } from "../assets/Logo L.svg";


export default function Form({ handleSubmit, handleChange, input, loading }){
    return (
    <div>
      <form data-testid = 'form' className="userInput" onSubmit={handleSubmit}>
        <input data-testid = 'input'
          type="text"
          name="inputField"
          className="inputField"
          value={input}
          onChange={handleChange}
          required
          placeholder={loading ? "Please wait..." : "Type here..."}
          disabled={loading}
        />

        <button data-testid = 'submitButton' type="submit" className="send-button">
          <LogoL data-testid ='logo' title="Send" className="buttonImg" />
        </button>
      </form>
    </div>
    )
}
