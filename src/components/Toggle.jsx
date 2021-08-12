import { Eye, EyeSlash } from "react-bootstrap-icons";

export default function Toogle({ filterResults }) {
  return (
    <div className="wrapper">
      {filterResults ? (
        <>
          <EyeSlash className="btn btn-sm icon" />
          <p>Go back</p>
        </>
      ) : (
        <>
          <Eye className="btn btn-sm icon" />
          <p>Show Acquired</p>
        </>
      )}
    </div>
  );
}
