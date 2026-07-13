import { AcademicProfileForm } from "@/features/academic/components/academic-profile-form";

export default function OnboardingPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center px-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Complete Your Academic Profile</h1>

        <p className="text-muted-foreground">
          This information is used to personalize your dashboard.
        </p>
      </div>

      <div className="mt-8">
        <AcademicProfileForm />
      </div>
    </main>
  );
}
