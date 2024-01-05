// Assumption: n should be more than 0, if not n will default to 1

var is_valid = function(n) {
    if (n>1) return n
    else return 1
}
var sum_to_n_a = function(n) {
    n = is_valid(n)
    return(n*(n+1)/2);
};

var sum_to_n_b = function(n) {
    n = is_valid(n)
    var x = 0;
    for (i=1; i<=n; i++) x+=i;
    return x;
};

var sum_to_n_c = function(n) {
    n = is_valid(n)
    if (n==1) return n
    else return (n + sum_to_n_c(n-1))
};

