import * as yup from 'yup';
import { FormValues } from '@/types/form.types';

export const formSchema: yup.ObjectSchema<FormValues> = yup.object({
  requesterName: yup.string().required('Nombre requerido'),
  department: yup.string().required('Departamento requerido'),
  // requestDate: yup.string().required('Fecha requerida'),
  phone: yup.string().required('Teléfono requerido'),
  email: yup.string().email('Correo inválido').required('Correo requerido'),
  institution: yup.string().required('Institución o dependencia requerido'),
  requestChannel: yup.mixed<'Correo'>().oneOf(['Correo']).required('Canal requerido'),

  requestTitle: yup.string().required('Título requerido'),
  desiredDeliveryDate: yup
    .date()
    .typeError('Fecha no válida')
    .required('Fecha deseada requerida'),
  requestType: yup.mixed<'Nuevo desarrollo' | 'Cambio / Mejora / Modificación de funcionalidad existente' | 'Corrección de errores'>().oneOf(['Nuevo desarrollo', 'Cambio / Mejora / Modificación de funcionalidad existente', 'Corrección de errores']).required('Campo requerido'),
  integrationSystem: yup.boolean().required('Campo requerido'),
  involveNewData: yup.boolean().required('Campo requerido'),
  description: yup.string().required('Descripción requerida'),
  objective: yup.string().required('Objetivo requerido'),
  // requirementJustification: yup.string().required('Sustento requerido'),
  // requirementJustification: yup
  //   .array()
  //   .of(yup.mixed())
  //   .min(1, 'Debes adjuntar al menos un archivo')
  //   .required('Archivos requeridos'),
  developmentType: yup.mixed<'Nuevo desarrollo' | 'Modificación'>().oneOf(['Nuevo desarrollo', 'Modificación']).required('Campo requerido'),
  includesDataLoad: yup.boolean().required('Campo requerido'),
  dataType: yup.array().of(
    yup.object().shape({
      value: yup.string().required('Valor requerido'),
      label: yup.string().required('Etiqueta requerida'),
    })
  ).optional().when('includesDataLoad', {
    is: true,
    then: (schema) => schema.min(1, 'Debe seleccionar al menos un tipo de dato').required('Tipo de datos requerido'),
  }),
  // dataSource: yup.string().optional().when('includesDataLoad', {
  //   is: true,
  //   then: (schema) => schema.required('Fuente requerida'),
  // }),
  dataFrequency: yup
    .object()
    .shape({
      value: yup.string(),
      label: yup.string(),
    })
    .nullable()
    .when('includesDataLoad', {
      is: true,
      then: (schema) =>
        schema
          .required('Periodicidad requerida')
          .test('has-value-label', 'Periodicidad requerida', (val) => {
            return !!val?.value && !!val?.label;
          }),
      otherwise: (schema) => schema.nullable().notRequired(),
    }),
  // metadataUpdate: yup.boolean().required('Campo requerido'),
  systemIntegration: yup.boolean().required('Campo requerido'),
  integratedSystems: yup.string().optional().when('systemIntegration', {
    is: true,
    then: (schema) => schema.required('Sistemas requeridos'),
  }),

  priority: yup.mixed<'Alta' | 'Media' | 'Baja'>().oneOf(['Alta', 'Media', 'Baja']).required('Campo requerido'),
  priorityJustification: yup.string().required('Justificación requerida'),
  affectsPortal: yup.boolean().required('Campo requerido'),
  requiresDowntime: yup.boolean().required('Campo requerido'),
  estimatedDowntime: yup.string().optional().when('requiresDowntime', {
    is: true,
    then: (schema) => schema.required('Tiempo estimado requerido'),
  }),

  includesAttachments: yup.boolean().required('Campo requerido'),
  // attachments: yup
  //   .array()
  //   .of(yup.mixed())
  //   .nullable()
  //   .when('includesAttachments', {
  //     is: true,
  //     then: (schema) =>
  //       schema
  //         .min(1, 'Debe adjuntar al menos un archivo')
  //         .required('Archivos requeridos'),
  //     otherwise: (schema) => schema.notRequired(),
  //   }),

  additionalNotes: yup.string().optional(),
  copyEmails: yup.string().optional(),
});