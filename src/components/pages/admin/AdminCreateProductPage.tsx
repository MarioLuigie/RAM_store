// components
import AdminProductForm from "@/components/forms/AdminProductForm";
import { ActionTypes } from "@/lib/constants/enums";

export default function AdminCreateProductPage() {
	return (
		<>
      <div className="my-8">
        <AdminProductForm actionType={ActionTypes.CREATE} />
      </div>
		</>
	);
}
