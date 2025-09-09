import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Eye, EyeOff, Search, AlertCircle, CheckCircle } from 'lucide-react';

export interface InputFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Label text for the input */
  label?: string;
  /** Helper text displayed below the input */
  helperText?: string;
  /** Error message - when provided, input shows error state */
  error?: string;
  /** Success message - when provided, input shows success state */
  success?: string;
  /** Input size variant */
  size?: 'small' | 'medium' | 'large';
  /** Input variant */
  variant?: 'default' | 'filled' | 'outline';
  /** Icon to display on the left side */
  leftIcon?: React.ReactNode;
  /** Icon to display on the right side */
  rightIcon?: React.ReactNode;
  /** Whether to show password visibility toggle (only for password type) */
  showPasswordToggle?: boolean;
  /** Whether the field is required */
  required?: boolean;
  /** Loading state */
  loading?: boolean;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({
    className,
    type = 'text',
    label,
    helperText,
    error,
    success,
    size = 'medium',
    variant = 'default',
    leftIcon,
    rightIcon,
    showPasswordToggle = false,
    required = false,
    loading = false,
    disabled,
    id,
    ...props
  }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [isFocused, setIsFocused] = React.useState(false);
    
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    const isPassword = type === 'password';
    const actualType = isPassword && showPassword ? 'text' : type;
    
    const hasError = !!error;
    const hasSuccess = !!success && !hasError;
    
    const sizeClasses = {
      small: 'h-8 text-sm px-3',
      medium: 'h-10 text-sm px-3',
      large: 'h-12 text-base px-4',
    };
    
    const variantClasses = {
      default: 'border-border bg-background hover:border-input-hover focus:border-primary',
      filled: 'border-transparent bg-muted hover:bg-muted/80 focus:bg-background focus:border-primary',
      outline: 'border-2 border-border bg-transparent hover:border-primary/50 focus:border-primary',
    };
    
    const stateClasses = hasError 
      ? 'border-destructive focus:border-destructive focus:ring-destructive/20'
      : hasSuccess 
      ? 'border-success focus:border-success focus:ring-success/20'
      : '';
    
    const inputClasses = cn(
      // Base styles
      'flex w-full rounded-md border transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
      // Size
      sizeClasses[size],
      // Variant
      variantClasses[variant],
      // State
      stateClasses,
      // Icon padding
      leftIcon && 'pl-10',
      rightIcon && 'pr-10',
      (isPassword && showPasswordToggle) && 'pr-10',
      className
    );

    return (
      <div className="space-y-2">
        {label && (
          <label 
            htmlFor={inputId}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {leftIcon}
            </div>
          )}
          
          <input
            ref={ref}
            id={inputId}
            type={actualType}
            className={inputClasses}
            disabled={disabled || loading}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...props}
          />
          
          {/* Right side icons */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center space-x-1">
            {loading && (
              <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full" />
            )}
            
            {hasError && !loading && (
              <AlertCircle className="h-4 w-4 text-destructive" />
            )}
            
            {hasSuccess && !loading && (
              <CheckCircle className="h-4 w-4 text-success" />
            )}
            
            {rightIcon && !hasError && !hasSuccess && !loading && (
              <div className="text-muted-foreground">
                {rightIcon}
              </div>
            )}
            
            {isPassword && showPasswordToggle && (
              <button
                type="button"
                onClick={() => setShowPassword(prev => !prev)}
                className="text-muted-foreground hover:text-foreground transition-colors p-0.5"
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            )}
          </div>
        </div>
        
        {(helperText || error || success) && (
          <p className={cn(
            'text-sm',
            hasError && 'text-destructive',
            hasSuccess && 'text-success',
            !hasError && !hasSuccess && 'text-muted-foreground'
          )}>
            {error || success || helperText}
          </p>
        )}
      </div>
    );
  }
);

InputField.displayName = 'InputField';

export default InputField;