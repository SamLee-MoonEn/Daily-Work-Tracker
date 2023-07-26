export default function WorkImportModal() {
  return (
    <>
      <input type="checkbox" id="work_import_modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box bg-white">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">This modal works with a hidden checkbox!</p>
          <div className="modal-action">
            <label htmlFor="work_import_modal" className="btn">
              Close!
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
