function Footer() {
  return (
    <footer className="absolute bottom-0 py-4 left-0 w-full bg-gray-100 border-t">
      <div className="flex justify-center">
        <small className="font-medium">
          Tous droits réservés. &copy; Brainstorms {new Date().getFullYear()}
        </small>
      </div>
    </footer>
  );
}

export default Footer;
