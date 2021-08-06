export default function Button({ handleClear, length }) {
  return (
    <div>
      {length > 0 && (
        <div className="btn-sort btn-reset ">
          <input
            className="check-with-label"
            type="checkbox"
            id="clear"
            checked={false}
            onChange={handleClear}
          />
          <label className="label-for-check" htmlFor="clear">
            CLEAR
          </label>
        </div>
      )}
    </div>
  );
}
