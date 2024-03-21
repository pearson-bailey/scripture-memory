"use server";
import RegisterForm from "@/src/components/forms/RegisterForm";

export default async function Register() {
  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <RegisterForm privacyUrl="" termsUrl="" />
    </div>
  );
}
