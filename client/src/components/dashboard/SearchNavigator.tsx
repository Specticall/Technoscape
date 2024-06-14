export default function SearchNavigator() {
  return (
    <div className="flex justify-between  items-center mt-4 text-sm mb-8">
      <div className="flex gap-2 items-center justify-center">
        <p>Newest</p>
        <i className="bx bxs-chevron-down"></i>
      </div>
      <p className="flex items-center gap-2 text-gray-600">
        <div className="bg-gray-100 px-[4px] rounded-sm">3</div>
        Companies
      </p>
    </div>
  );
}
