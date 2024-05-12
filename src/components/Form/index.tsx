import { Button, Input } from '@nextui-org/react';
import { useForm } from '@tanstack/react-form';
import type { FieldApi } from '@tanstack/react-form';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function FieldInfo({ field }: { field: FieldApi<any, any, any, any> }) {
  return (
    <>
      {field.state.meta.touchedErrors ? (
        <em>{field.state.meta.touchedErrors}</em>
      ) : null}
      {field.state.meta.isValidating ? 'Validating...' : null}
    </>
  );
}

export interface FormField {
  label?: string;
  field: string;
  rules?: Array<{
    name: string;
    message?: string;
  }>;
  render?: () => JSX.Element;
  fieldType: 'input' | 'select' | 'textarea';
}

export interface FormProps {
  initialValues?: Record<
    string,
    string | number | readonly string[] | undefined
  >;
  fields: Array<FormField>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onFinish?: (values: Record<any, unknown>) => void;
}

export default function Form(props: FormProps) {
  const { initialValues = {}, fields, onFinish } = props;
  const form = useForm({
    defaultValues: initialValues,
    onSubmit: async ({ value }) => {
      // Do something with form data
      onFinish?.(value);
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <div>
        {/* A type-safe field component*/}
        {fields.map((item) => (
          <form.Field
            key={item.field}
            name={item.field}
            children={(field) => {
              // Avoid hasty abstractions. Render props are great!
              return (
                <>
                  <label htmlFor={field.name}>{item.label}</label>
                  <Input
                    id={field.name}
                    name={field.name}
                    autoComplete="off"
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    value={field.state.value as any}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldInfo field={field} />
                </>
              );
            }}
          ></form.Field>
        ))}
      </div>
      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
        children={([canSubmit, isSubmitting]) => (
          <Button color="primary" type="submit" disabled={!canSubmit}>
            {isSubmitting ? '...' : '提交'}
          </Button>
        )}
      />
    </form>
  );
}
