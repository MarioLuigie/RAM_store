export enum Theme {
	LIGHT = 'light',
	DARK = 'dark',
	SYSTEM = 'system',
}

export enum Gender {
	MALE = 'Male',
	FEMALE = 'Female',
	OTHER = 'Other',
}

export enum FormFieldType {
	INPUT = 'input',
	TEXTAREA = 'textarea',
	SELECT = 'select',
	PHONE_INPUT = 'phoneInput',
	CHECKBOX = 'checkbox',
	DATE_PICKER = 'datePicker',
	SKELETON = 'skeleton',
}

export enum Auth {
	SESSION = 'ram-store-sc',
}

export enum AuthTypes {
	SIGN_IN = 'sign-in',
	SIGN_UP = 'sign-up',
}

export enum AuthRole {
	USER = 'user',
	ADMIN = 'admin',
	MODERATOR = 'moderator',
	GUEST = 'guest',
}

export enum PayPalStatus {
	COMPLETED = 'COMPLETED',
	CREATED = 'CREATED',
}

export enum PaymentMethod {
	PAYPAL = 'PayPal',
	STRIPE = 'Stripe',
	CASH_ON_DELIVERY = 'CashOnDelivery',
}

export enum ActionTypes {
	CREATE = 'Create',
	UPDATE = 'Update',
}
