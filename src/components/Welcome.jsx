import cart from "../assets/images/cart.png";

export default function Welcome() {
  return (
    <>
      <section className="bloc">
        <img className="img-main" src={cart} alt="img-main" width="200px" />
      </section>
      <div className="emptylist">
        <div className="description">
          Welcome to EIKA! Keep track of your shopping list with the app.
          <br />
          Get started by adding a item to your list. You can then sort your
          shopping list by name or price and mark items as acquired.
          <br />
          <strong>Thank you for shopping with us ...</strong>
        </div>
      </div>
    </>
  );
}
