"use client"

import type React from "react"

import { useState } from "react"
import { Check, Shield, Zap, Star, Crown, User, Info, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface Plan {
  name: string
  subtitle: string
  monthlyPrice: number | "Free"
  color: string
  icon: React.ElementType
  features: string[]
  popular: boolean
  isFree?: boolean
  note?: string
}

export function SubscriptionPlans() {
  const [isAnnual, setIsAnnual] = useState(false)

  const plans: Plan[] = [
    {
      name: "Free Plan",
      subtitle: "Basic Access",
      monthlyPrice: "Free",
      color: "bg-gradient-to-br from-gray-400 to-gray-500",
      icon: User,
      features: [
        "Manage your personal profile",
        "Upload and manage CVs/resumes",
        "View your dashboard and track your activity",
        "Secure messaging with WorkScout admin",
      ],
      note: "Job applications will only be submitted after a subscription is activated",
      popular: false,
      isFree: true,
    },
    {
      name: "Basic Plan",
      subtitle: "Bronze",
      monthlyPrice: 5,
      color: "bg-gradient-to-br from-teal-400 to-teal-500",
      icon: Shield,
      features: [
        "Everything in the Basic Plan",
        "10 tailored job applications per month",
        "Basic resume review",
        "Access to a limited selection of career tips & resources",
      ],
      popular: false,
    },
    {
      name: "Standard Plan",
      subtitle: "Silver",
      monthlyPrice: 10,
      color: "bg-gradient-to-br from-blue-500 to-blue-600",
      icon: Zap,
      features: [
        "Everything in the Basic Plan",
        "20 tailored job applications per month",
        "AI-assisted CV optimization",
        "LinkedIn profile optimization tips",
        "Priority email support",
      ],
      popular: true,
    },
    {
      name: "Pro Plan",
      subtitle: "Gold",
      monthlyPrice: 25,
      color: "bg-gradient-to-br from-amber-400 to-amber-500",
      icon: Star,
      features: [
        "Everything in the Standard Plan",
        "30 tailored job applications per month",
        "Personalized job-matching service",
        "Access to exclusive job opportunities",
        "Interview preparation guides & resources",
        "Networking strategies & tips",
        "1-on-1 career consultation (quarterly)",
      ],
      popular: false,
    },
    {
      name: "Premium Plan",
      subtitle: "Platinum",
      monthlyPrice: 50,
      color: "bg-gradient-to-br from-purple-500 to-purple-600",
      icon: Crown,
      features: [
        "Everything in the Pro Plan",
        "Unlimited tailored job applications (subject to job availability)",
        "1-on-1 job search strategy call (once per month)",
        "Personalized cover letter writing",
        "Direct employer outreach assistance",
        "Exclusive career development webinars",
        "Career Assistant for ongoing support after securing a job",
        "Monthly career coaching sessions",
        "Salary negotiation assistance",
        "Work-related support (e.g., workplace conflict, career progression advice)",
      ],
      popular: false,
    },
  ]

  return (
    <TooltipProvider>
      <div className="w-full bg-background pt-16 md:pt-0 lg:pt-20 py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Subscription Packages</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Choose the perfect plan to accelerate your career journey and land your dream job faster.
              </p>
            </div>

            <div className="flex items-center space-x-2 mt-6">
              <span className={cn("text-sm", !isAnnual && "font-medium")}>Monthly</span>
              <Switch checked={isAnnual} onCheckedChange={setIsAnnual} aria-label="Toggle annual billing" />
              <span className={cn("text-sm", isAnnual && "font-medium")}>
                Annual <span className="text-emerald-500 font-medium">(20% off)</span>
              </span>
            </div>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {plans.map((plan) => {
              const Icon = plan.icon
              const monthlyPrice = plan.monthlyPrice
              const annualPrice = typeof monthlyPrice === "number" ? Math.round(monthlyPrice * 12 * 0.8) : "Free" // 20% discount
              const displayPrice = isAnnual && typeof monthlyPrice === "number" ? annualPrice : monthlyPrice
              const buttonText = plan.isFree ? "Get Started" : `Choose ${plan.name.split(" ")[0]}`

              return (
                <div
                  key={plan.name}
                  className={cn(
                    "relative flex flex-col overflow-hidden rounded-lg border bg-background h-full",
                    plan.popular && "border-2 border-blue-500 shadow-lg",
                    plan.isFree && "border-dashed",
                  )}
                >
                  {plan.popular && (
                    <div className="absolute right-0 top-0 bg-blue-500 px-3 py-1 text-xs font-medium text-white">
                      Popular
                    </div>
                  )}

                  <div className={cn("p-3", plan.color)}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Icon className="h-6 w-6 text-white" />
                        <div>
                          <h3 className="font-bold text-white">{plan.name}</h3>
                          <p className="text-xs text-white/90">{plan.subtitle}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col p-6 h-full">
                    <div className="mb-4">
                      <div className="flex items-baseline">
                        {typeof displayPrice === "number" ? (
                          <>
                            <span className="text-3xl font-bold">£{displayPrice}</span>
                            <span className="ml-1 text-muted-foreground">/{isAnnual ? "year" : "month"}</span>
                          </>
                        ) : (
                          <span className="text-3xl font-bold text-emerald-500">{displayPrice}</span>
                        )}
                      </div>
                      {typeof monthlyPrice === "number" && (
                        <p className="mt-1 text-xs text-muted-foreground">
                          {isAnnual ? "Billed annually" : "Billed monthly"}
                        </p>
                      )}
                    </div>

                    <div className="space-y-3 flex-grow">
                      {plan.features.map((feature, index) => (
                        <div key={index} className="flex items-start">
                          <Check
                            className={cn(
                              "mr-2 h-5 w-5 shrink-0",
                              plan.name === "Free Plan" && "text-gray-500",
                              plan.name === "Basic Plan" && "text-teal-500",
                              plan.name === "Standard Plan" && "text-blue-500",
                              plan.name === "Pro Plan" && "text-amber-500",
                              plan.name === "Premium Plan" && "text-purple-500",
                            )}
                          />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}

                      {plan.note && (
                        <>
                          <div className="w-full h-px bg-gray-200 my-3"></div>
                          <div className="flex items-start bg-amber-50 p-2 rounded-md border border-amber-200">
                            <AlertCircle className="mr-2 h-5 w-5 shrink-0 text-amber-500" />
                            <span className="text-sm text-amber-700">{plan.note}</span>
                          </div>
                        </>
                      )}
                    </div>
                    {plan.isFree && (
                        <div className="flex justify-center mt-3">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="flex items-center text-xs text-muted-foreground cursor-help">
                                <Info className="h-3.5 w-3.5 mr-1" />
                                <span>Upgrade anytime</span>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="w-[200px] text-xs">
                                Start with our Free Plan and upgrade to a paid subscription whenever you're ready for expert help in 
                                applying for jobs.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      )}

                    <div className="mt-6">
                      <Button
                        className={cn(
                          "w-full text-white",
                          plan.name === "Free Plan" &&
                            "bg-gradient-to-br from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600",
                          plan.name === "Basic Plan" &&
                            "bg-gradient-to-br from-teal-400 to-teal-500 hover:from-teal-500 hover:to-teal-600",
                          plan.name === "Standard Plan" &&
                            "bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700",
                          plan.name === "Pro Plan" &&
                            "bg-gradient-to-br from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600",
                          plan.name === "Premium Plan" &&
                            "bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700",
                        )}
                      >
                        {buttonText}
                      </Button>

                     
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}
