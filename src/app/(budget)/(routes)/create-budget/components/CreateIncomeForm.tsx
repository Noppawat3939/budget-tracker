import React from "react";
import { Card } from "@/components/ui/card";
import {
  DialogContent,
  DialogTitle,
  Dialog,
  DialogTrigger,
  DialogHeader,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components";
import { Button } from "@/components/ui/button";
import { LineWave } from "react-loader-spinner";
import type { CreateIncomeFormProps } from "./type";

export default function CreateIncomeForm({
  onChange,
  income,
  date,
  onSubmit,
  isDisabled,
  onSelectDate,
}: CreateIncomeFormProps) {
  return (
    <Card className="flex items-center  justify-center h-[400px]">
      <Dialog>
        <DialogTrigger className="font-medium bg-slate-950 hover:bg-slate-800 rounded-md px-3 py-2 text-sm text-white">
          Get started
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Please enter your income
            </DialogTitle>
          </DialogHeader>
          <Input
            inputMode="numeric"
            value={income}
            onChange={onChange}
            aria-label="income-value-input"
            placeholder="Fill in numbers only (0-9)"
          />
          <DatePicker
            placeholder="Pick the date the money is paid"
            value={date}
            onSelect={onSelectDate}
          />
          <Button
            disabled={isDisabled}
            type="submit"
            className="w-fit m-auto"
            onClick={onSubmit}
          >
            Create expense
            <LineWave
              height="100"
              width="100"
              color="#000"
              ariaLabel="line-wave"
              visible={!true}
            />
          </Button>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
