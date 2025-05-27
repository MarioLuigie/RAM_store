// components
import AdminCreateProductForm from "@/components/forms/AdminCreateProductForm";

export default function CreateProductPage() {
	return (
		<div>
			<h1 className="text-xl  mb-3">Create Product</h1>
      <div className="my-8">
        <AdminCreateProductForm />
      </div>
		</div>
	);
}
