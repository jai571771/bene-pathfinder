import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Stepper } from "@/components/Stepper";
import {
  User,
  Home,
  Briefcase,
  FileText,
  ArrowRight,
  ArrowLeft,
  Check,
  Info,
} from "lucide-react";
import { indianStates } from "@/data/mockData";

const steps = ["Personal", "Household", "Occupation", "Documents"];

const ProfileCompletion = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    // Personal
    fullName: "",
    dateOfBirth: "",
    gender: "",
    state: "",
    district: "",
    pincode: "",
    
    // Household
    householdSize: "",
    annualIncome: "",
    casteCategory: "",
    isDisabled: false,
    disabilityType: "",
    
    // Occupation
    occupation: "",
    employmentType: "",
    sector: "",
    
    // Documents
    hasAadhaar: false,
    hasPAN: false,
    hasIncomeCert: false,
    hasCasteCert: false,
    hasDisabilityCert: false,
  });

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Submit and navigate
      navigate("/eligibility-check");
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 p-4 bg-info/10 border border-info/20 rounded-lg">
              <Info className="h-5 w-5 text-info flex-shrink-0" />
              <p className="text-sm text-muted-foreground">
                Your personal information helps us match you with relevant schemes. All data is kept secure.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name (as per Aadhaar)</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="Enter your full name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dob">Date of Birth</Label>
                <Input
                  id="dob"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Gender</Label>
              <RadioGroup
                value={formData.gender}
                onValueChange={(v) => setFormData({ ...formData, gender: v })}
                className="flex gap-4"
              >
                {["Male", "Female", "Other"].map((g) => (
                  <div key={g} className="flex items-center space-x-2">
                    <RadioGroupItem value={g.toLowerCase()} id={g.toLowerCase()} />
                    <Label htmlFor={g.toLowerCase()} className="font-normal">{g}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>State</Label>
                <Select
                  value={formData.state}
                  onValueChange={(v) => setFormData({ ...formData, state: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    {indianStates.filter(s => s !== 'All States').map((state) => (
                      <SelectItem key={state} value={state}>{state}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="district">District</Label>
                <Input
                  id="district"
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  placeholder="Enter your district"
                />
              </div>
            </div>

            <div className="w-1/2">
              <div className="space-y-2">
                <Label htmlFor="pincode">PIN Code</Label>
                <Input
                  id="pincode"
                  value={formData.pincode}
                  onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                  placeholder="6-digit PIN code"
                  maxLength={6}
                />
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="householdSize">Household Size</Label>
                <Select
                  value={formData.householdSize}
                  onValueChange={(v) => setFormData({ ...formData, householdSize: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {["1", "2", "3", "4", "5", "6", "7", "8+"].map((n) => (
                      <SelectItem key={n} value={n}>{n} {n === "1" ? "member" : "members"}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="annualIncome">Annual Household Income</Label>
                <Select
                  value={formData.annualIncome}
                  onValueChange={(v) => setFormData({ ...formData, annualIncome: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-100000">Below ₹1,00,000</SelectItem>
                    <SelectItem value="100000-250000">₹1,00,000 - ₹2,50,000</SelectItem>
                    <SelectItem value="250000-500000">₹2,50,000 - ₹5,00,000</SelectItem>
                    <SelectItem value="500000-1000000">₹5,00,000 - ₹10,00,000</SelectItem>
                    <SelectItem value="1000000+">Above ₹10,00,000</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Caste/Tribe Category</Label>
              <Select
                value={formData.casteCategory}
                onValueChange={(v) => setFormData({ ...formData, casteCategory: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General</SelectItem>
                  <SelectItem value="obc">Other Backward Class (OBC)</SelectItem>
                  <SelectItem value="sc">Scheduled Caste (SC)</SelectItem>
                  <SelectItem value="st">Scheduled Tribe (ST)</SelectItem>
                  <SelectItem value="ews">Economically Weaker Section (EWS)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isDisabled"
                  checked={formData.isDisabled}
                  onCheckedChange={(checked) => setFormData({ ...formData, isDisabled: !!checked })}
                />
                <Label htmlFor="isDisabled" className="font-normal">
                  I am a person with disability (PwD)
                </Label>
              </div>

              {formData.isDisabled && (
                <div className="ml-6 space-y-2">
                  <Label>Type of Disability</Label>
                  <Select
                    value={formData.disabilityType}
                    onValueChange={(v) => setFormData({ ...formData, disabilityType: v })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="visual">Visual Impairment</SelectItem>
                      <SelectItem value="hearing">Hearing Impairment</SelectItem>
                      <SelectItem value="locomotor">Locomotor Disability</SelectItem>
                      <SelectItem value="intellectual">Intellectual Disability</SelectItem>
                      <SelectItem value="mental">Mental Illness</SelectItem>
                      <SelectItem value="multiple">Multiple Disabilities</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Current Occupation</Label>
              <Select
                value={formData.occupation}
                onValueChange={(v) => setFormData({ ...formData, occupation: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select occupation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="employed">Employed</SelectItem>
                  <SelectItem value="self-employed">Self-Employed</SelectItem>
                  <SelectItem value="farmer">Farmer/Agricultural Worker</SelectItem>
                  <SelectItem value="homemaker">Homemaker</SelectItem>
                  <SelectItem value="retired">Retired</SelectItem>
                  <SelectItem value="unemployed">Unemployed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {(formData.occupation === "employed" || formData.occupation === "self-employed") && (
              <>
                <div className="space-y-2">
                  <Label>Employment Type</Label>
                  <RadioGroup
                    value={formData.employmentType}
                    onValueChange={(v) => setFormData({ ...formData, employmentType: v })}
                    className="flex flex-wrap gap-4"
                  >
                    {["Full-time", "Part-time", "Contract", "Daily Wage"].map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <RadioGroupItem value={type.toLowerCase().replace(" ", "-")} id={type} />
                        <Label htmlFor={type} className="font-normal">{type}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>Sector</Label>
                  <Select
                    value={formData.sector}
                    onValueChange={(v) => setFormData({ ...formData, sector: v })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select sector" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="government">Government</SelectItem>
                      <SelectItem value="private">Private</SelectItem>
                      <SelectItem value="public-sector">Public Sector</SelectItem>
                      <SelectItem value="informal">Informal/Unorganized</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <p className="text-sm text-muted-foreground">
              Select the documents you currently have. This helps us recommend schemes you can apply for immediately.
            </p>

            <div className="space-y-4">
              {[
                { id: "hasAadhaar", label: "Aadhaar Card", desc: "12-digit unique identification" },
                { id: "hasPAN", label: "PAN Card", desc: "Permanent Account Number" },
                { id: "hasIncomeCert", label: "Income Certificate", desc: "Issued by Tehsildar/Revenue Officer" },
                { id: "hasCasteCert", label: "Caste Certificate", desc: "For SC/ST/OBC categories" },
                { id: "hasDisabilityCert", label: "Disability Certificate", desc: "UDID or state disability certificate" },
              ].map((doc) => (
                <div
                  key={doc.id}
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    formData[doc.id as keyof typeof formData]
                      ? "border-success bg-success/5"
                      : "border-border hover:border-accent/50"
                  }`}
                  onClick={() => setFormData({ ...formData, [doc.id]: !formData[doc.id as keyof typeof formData] })}
                >
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id={doc.id}
                      checked={formData[doc.id as keyof typeof formData] as boolean}
                      onCheckedChange={(checked) => setFormData({ ...formData, [doc.id]: !!checked })}
                    />
                    <div className="flex-1">
                      <Label htmlFor={doc.id} className="cursor-pointer">
                        {doc.label}
                      </Label>
                      <p className="text-xs text-muted-foreground">{doc.desc}</p>
                    </div>
                    {formData[doc.id as keyof typeof formData] && (
                      <Check className="h-5 w-5 text-success" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar isLoggedIn userName="John Doe" userRole="citizen" />

      <main className="section-container py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Complete Your Profile
            </h1>
            <p className="text-muted-foreground">
              Help us find the best schemes for you
            </p>
          </div>

          {/* Stepper */}
          <div className="mb-12">
            <Stepper
              steps={steps}
              currentStep={currentStep}
              onStepClick={setCurrentStep}
            />
          </div>

          {/* Form Card */}
          <div className="card-elevated p-6 mb-8">
            <div className="flex items-center gap-3 mb-6">
              {currentStep === 0 && <User className="h-6 w-6 text-accent" />}
              {currentStep === 1 && <Home className="h-6 w-6 text-accent" />}
              {currentStep === 2 && <Briefcase className="h-6 w-6 text-accent" />}
              {currentStep === 3 && <FileText className="h-6 w-6 text-accent" />}
              <h2 className="text-xl font-semibold text-foreground">
                {steps[currentStep]} Details
              </h2>
            </div>

            {renderStepContent()}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handlePrev}
              disabled={currentStep === 0}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Previous
            </Button>

            <Button onClick={handleNext} className="gap-2">
              {currentStep === steps.length - 1 ? (
                <>
                  Check Eligibility
                  <Check className="h-4 w-4" />
                </>
              ) : (
                <>
                  Next
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProfileCompletion;
