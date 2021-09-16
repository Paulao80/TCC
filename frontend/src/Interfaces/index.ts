export interface Produtor {
    ProdutorId: number;
    Nome: string;
    DataNasc: string;
    TipoPessoa: number;
    Nacionalidade: string;
    CpfCnpj: string;
    RG: string;
    OrgaoExp: string;
    EstadoExp: string;
    DataExp: string;
    EstadoCivil: number;
    Telefone: string;
    UltLaticinio: string;
}

export interface Uf {
    id: number;
    sigla: string;
    nome: string;
}