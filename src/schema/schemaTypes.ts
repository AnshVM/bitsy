export const types = [
  'String',      'Number',
  'Boolean',     'DocumentArray',
  'Subdocument', 'Array',
  'Buffer',      'Date',
  'ObjectId',    'Mixed',
  'Decimal',     'Decimal128',
  'Map',         'UUID',
  'Oid',         'Object',
  'Bool',        'ObjectID'
]

export const typeConstructorMap = new Map<Function,string>([
  [String,"String"],
  [Number,"Number"],
  [Boolean,"Boolean"],
  [Array,"Array"],
  [Buffer,"Buffer"],
  [Date,"Date"],
  [Map,"Map"],
  [Object,"Object"],
])