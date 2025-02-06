import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import React from "react";

const WizardStepper = ({ currentStep }: WizardStepperProps) => {
  return (
    <motion.div 
      className="wizard-stepper"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="wizard-stepper__container">
        {[1, 2, 3].map((step, index) => (
          <React.Fragment key={step}>
            <motion.div 
              className="wizard-stepper__step"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                className={cn("wizard-stepper__circle", {
                  "wizard-stepper__circle--completed":
                    currentStep > step || (currentStep === 3 && step === 3),
                  "wizard-stepper__circle--current":
                    currentStep === step && step !== 3,
                  "wizard-stepper__circle--upcoming": currentStep < step,
                })}
                animate={{
                  scale: currentStep === step ? [1, 1.1, 1] : 1,
                }}
                transition={{
                  duration: 1.5,
                  repeat: currentStep === step ? Infinity : 0,
                }}
              >
                <AnimatePresence mode="wait">
                  {currentStep > step || (currentStep === 3 && step === 3) ? (
                    <motion.div
                      key="check"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                    >
                      <Check className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <motion.span
                      key="number"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      {step}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.p
                className={cn("wizard-stepper__text", {
                  "wizard-stepper__text--active": currentStep >= step,
                  "wizard-stepper__text--inactive": currentStep < step,
                })}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {step === 1 && "Details"}
                {step === 2 && "Payment"}
                {step === 3 && "Completion"}
              </motion.p>
            </motion.div>

            {index < 2 && (
              <motion.div
                className={cn("wizard-stepper__line", {
                  "wizard-stepper__line--completed": currentStep > step,
                  "wizard-stepper__line--incomplete": currentStep <= step,
                })}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </motion.div>
  );
};

export default WizardStepper;