import { useEffect } from 'react';

import {
  RadioGroupField,
  ImageCheckboxGroup,
  CustomSelectField,
  DomainQuestion,
  TextField,
  TextareaField,
  ContactInfoStep
} from '@/components/field';

import { motion } from 'framer-motion';

function FieldRenderer({ step, value, onChange }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step?.id]);

  const commonProps = {
    id: step?.id,
    label: step?.label,
    description: step?.description,
    required: step?.required,
    value,
    onChange: (val) => onChange(step.id, val),
  };

  const animationProps = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: 0.5
  };

  switch (step?.type) {
    case 'contact-info':
      return (
        <motion.div key={step?.id} {...animationProps}>
          <ContactInfoStep {...commonProps} />
        </motion.div>
      );
    case 'radio':
      return (
        <motion.div key={step?.id} {...animationProps}>
          <RadioGroupField options={step.options} {...commonProps} />
        </motion.div>
      );
    case 'select':
      return (
        <motion.div key={step?.id} {...animationProps}>
          <CustomSelectField options={step.options} {...commonProps} />
        </motion.div>
      );
    case 'image-multiselect':
      return (
        <motion.div key={step?.id} {...animationProps}>
          <ImageCheckboxGroup options={step.options} {...commonProps} />
        </motion.div>
      );
    case 'domain-radio':
      return (
        <motion.div key={step?.id} {...animationProps}>
          <DomainQuestion options={step.options} {...commonProps} />
        </motion.div>
      );
    case 'text':
      return (
        <motion.div key={step?.id} {...animationProps}>
          <TextField {...commonProps} />
        </motion.div>
      );
    case 'textarea':
      return (
        <motion.div key={step?.id} {...animationProps}>
          <TextareaField {...commonProps} minLength={step.minLength} />
        </motion.div>
      );
    default:
      return null;
  }
}

export default FieldRenderer;