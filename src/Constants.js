// RPC
const MaxUTXOs = 255
const ReqTimeout = 8000;

// Transaction
const MaxDataStoreSize = 2097152;
const BaseDatasizeConst = 376;
const DataStoreMinDeposit = ((BaseDatasizeConst + 1) * 3);
const EpochBlockSize = 1024;
const EpochBoundary = 960;

module.exports = {
    MaxUTXOs,
    ReqTimeout,
    MaxDataStoreSize,
    BaseDatasizeConst,
    DataStoreMinDeposit,
    EpochBlockSize,
    EpochBoundary
}