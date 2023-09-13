'use client';

import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';

import { cn } from '@/utils/cn.utils';
import { Label } from './Label';
import { Button } from './Button';
import { Lock, Unlock } from 'lucide-react';

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn('relative flex w-full touch-none select-none items-center', className)}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary ">
      <SliderPrimitive.Range className="absolute h-full bg-primary  data-[disabled]:bg-primary/20" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[disabled]:border-primary/50" />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

const SliderLabelValue = (props: {
  label: string;
  locked: boolean;
  value: number;
  max: number;
  step: number;
  onValueChange: (value: number) => void;
  onLockChange: (value: boolean) => void;
}) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Label>{props.label}</Label>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={() => props.onLockChange(!props.locked)}
          >
            {props.locked ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
          </Button>
        </div>
        <div className="bg-muted rounded-lg w-12 text-center">
          <Label className="text-muted-foreground">{props.value}</Label>
        </div>
      </div>
      <Slider
        value={[props.value]}
        disabled={props.locked}
        max={props.max}
        step={props.step}
        onValueChange={value => props.onValueChange(value[0])}
      />
    </div>
  );
};

export { Slider, SliderLabelValue };
