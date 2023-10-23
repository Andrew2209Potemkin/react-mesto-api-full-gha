function WindowWithForm({ title, text, children, onSubmit, link }) {
  return (
    <div className="window">
      <h2 className="window__title">{title}</h2>
      <form className="window__form" onSubmit={onSubmit}>
        {children}
        <button className="window__button" type="submit">{text}</button>
      </form>
      {link}
    </div>
  );
}

export default WindowWithForm;