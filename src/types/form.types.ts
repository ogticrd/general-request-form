export interface FormValues {
  requesterName: string;
  department: string;
  phone: string;
  email: string;
  requestChannel: 'Correo' | 'Whatsapp' | 'Otro';

  requestTitle: string;
  desiredDeliveryDate: string;
  description: string;
  objective: string;
  requirementJustification: string;

  developmentType: 'Nuevo desarrollo' | 'Modificación';
  includesDataLoad: boolean;
  dataType?: any;
  dataFrequency?: any;
  systemIntegration: boolean;
  integratedSystems?: string;

  priority: 'Alta' | 'Media' | 'Baja';
  priorityJustification: string;
  affectsPortal: boolean;
  requiresDowntime: boolean;
  estimatedDowntime?: string;

  includesAttachments: boolean;
  // attachments?: any;

  additionalNotes?: string;
  copyEmails?: string;
}