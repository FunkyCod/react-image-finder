import errorImage from "../../image/error-img-api.webp";
import PropTypes from "prop-types";

export default function FetchErrorView({ message }) {
  return (
    <div role="alert" style={{ textAlign: "center", margin: "10px auto" }}>
      <img
        style={{ margin: "10px auto" }}
        src={errorImage}
        width="240"
        alt="There are no images with this name"
      />
      <p>
        {/* <b>{message}</b> */}
        <b>Try another name</b>
      </p>
    </div>
  );
}
FetchErrorView.propTypes = {
  message: PropTypes.string,
};
