export interface FormValues {
  requesterName: string;
  department: string;
  phone: string;
  email: string;
  institution: string;
  requestChannel: 'Correo';

  requestTitle: string;
  desiredDeliveryDate: Date | null;
  requestType: 'Nuevo desarrollo' | 'Cambio / Mejora / Modificación de funcionalidad existente' | 'Corrección de errores';
  integrationSystem: boolean;
  involveNewData: boolean;
  description: string;
  objective: string;
  requirementJustification: string;
  // requirementJustification: any[];

  // developmentType: 'Nuevo desarrollo' | 'Modificación';
  // includesDataLoad: boolean;
  // dataType?: any;
  // dataFrequency?: any;
  // systemIntegration: boolean;
  // integratedSystems?: string;

  priority: 'Alta' | 'Media' | 'Baja';
  priorityJustification: string;
  affectsPortal: boolean;
  requiresDowntime: boolean;
  estimatedDowntime?: string;

  includesAttachments: boolean;
  attachments?: string;
  // attachments?: any;

  additionalNotes?: string;
  copyEmails?: string;
}